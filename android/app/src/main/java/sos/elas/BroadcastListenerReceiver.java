package sos.elas;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.location.Location;
import android.os.Handler;
import android.telephony.SmsManager;
import android.util.Log;
import android.widget.Toast;


import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationResult;
import com.google.android.gms.location.LocationServices;

import java.util.ArrayList;
import java.util.List;


public class BroadcastListenerReceiver extends BroadcastReceiver {

    public static String TAG = "PanicButton";

    private int mCounter = 0;
    private Handler mHandler = new Handler();

    private int delayMilis = DefaultPreferences.delaySeconds * 1000;

    private Runnable mResetCounter = new Runnable() {
        @Override
        public void run() {
            Log.d(TAG, "reset count");
            mCounter = 0;
        }
    };

    private FusedLocationProviderClient client;
    private LocationRequest locationRequest;

    Context mContext;

    @Override
    public void onReceive(Context context, Intent intent) {
        mContext = context;

        if(client == null || locationRequest == null){
            client = LocationServices.getFusedLocationProviderClient(context);
            locationRequest = LocationRequest.create();
            locationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
            locationRequest.setInterval(0);
            locationRequest.setFastestInterval(0);
        }

        if (mCounter == 0){
            Log.d(TAG, "start  count");
            mHandler.postDelayed(mResetCounter, delayMilis);
        }

        mCounter++;

        if (mCounter == DefaultPreferences.timesPressed){
            mHandler.removeCallbacks(mResetCounter);
            mCounter = 0;
            Log.d(TAG, "sending message");
            Toast.makeText(context, "Sending SMS mensage for your contacts", Toast.LENGTH_LONG).show();
            sendSMSMessage();
            getLastKnownLocation();
        }

        Log.d(TAG, intent.getAction() + " - " + mCounter);
    }

    private final LocationCallback locationCallback = new LocationCallback() {

        @Override
        public void onLocationResult(LocationResult locationResult) {
            Log.d(TAG, "onLocationResult()");
            List<Location> locationList = locationResult.getLocations();
            if (locationList.size() != 0) {
                Location location = locationList.get(0);
                Log.e("AppLocationService", "Latitude  - " +location.getLatitude()+", longitude  - " +location.getLongitude() );
                sendSMSMessage(location.getLatitude(), location.getLongitude());
            }
        }
    };


    private void getLastKnownLocation(){
        client.requestLocationUpdates(locationRequest, locationCallback, null);
        //client.removeLocationUpdates(locationCallback);
    }


    private void sendSMSMessage(double lat, double lng){
        SmsManager smsManager = SmsManager.getDefault();
        List<String> contacts = getContacts();
        for (String contact: contacts) {
            smsManager.sendTextMessage(contact, null, "https://www.google.com/maps/?q="+lat+","+lng, null, null);
        }
        client.removeLocationUpdates(locationCallback);
    }

    private void sendSMSMessage(){
        SmsManager smsManager = SmsManager.getDefault();
        List<String> contacts = getContacts();
        if(contacts == null){
            return;
        }
        for (String contact: contacts) {
            smsManager.sendTextMessage(contact, null, "SOS: Estou em perigo, me ajude.", null, null);
        }
    }

    private List<String> getContacts(){
        String file = "sos_elas";
        String baseContactName = "phoneNumber";
        List<String> contacts = new ArrayList<String>();

        if(mContext == null){
            Log.e(TAG, "mContext null");
            return null;
        }

        SharedPreferences preferences = mContext.getSharedPreferences(file, Context.MODE_PRIVATE);
        for(int i = 0; i < 4; i++){
            String pref = preferences.getString(baseContactName+i, null);
            Log.i(TAG, "Retrieving contact baseContactName+i :: " + pref);
            if(pref != null){
                contacts.add(pref);
            }
        }
        return contacts;
    }

}
