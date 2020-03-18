package sos.elas;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.content.IntentFilter;
import android.graphics.Bitmap;
import android.os.Build;
import android.os.IBinder;
import android.util.Log;

import androidx.core.app.NotificationCompat;

public class ListenBroadCastService extends Service {


    BroadcastListenerReceiver broadcastListenerReceiver;
    String CHANNEL_ID = "1005";

    public ListenBroadCastService() {
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onCreate() {
        super.onCreate();

        Log.d(BroadcastListenerReceiver.TAG, "OnCreate");

        IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction("android.intent.action.USER_PRESENT");
        intentFilter.addAction("android.intent.action.SCREEN_OFF");
        intentFilter.addAction("android.intent.action.SCREEN_ON");
        intentFilter.setPriority(100);

        broadcastListenerReceiver = new BroadcastListenerReceiver();
        registerReceiver(broadcastListenerReceiver, intentFilter);
        Log.d(BroadcastListenerReceiver.TAG, "broadcastListenerReceiver registered");

        //Add notification to keep working in android Q+
        createNotificationChannel();
        Intent notificationIntent = new Intent(this, MainActivity.class);
        Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID)
                .setSmallIcon(android.R.drawable.ic_menu_info_details)
                .setTicker("Ticker")
                .setContentTitle("SOS Running")
                .setContentText("The SOS is running in background")
                .setContentIntent(PendingIntent.getActivity(this, 0, notificationIntent, 0))
                .setWhen(System.currentTimeMillis())
                .build();

        startForeground(1005, notification);

    }

    @Override
    public void onDestroy() {
        super.onDestroy();

        if(broadcastListenerReceiver != null){
            unregisterReceiver(broadcastListenerReceiver);
            Log.d(BroadcastListenerReceiver.TAG, "removing receiver");
        }

    }


    private void createNotificationChannel() {
        // Create the NotificationChannel, but only on API 26+ because
        // the NotificationChannel class is new and not in the support library
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            CharSequence name = "Channel Name";
            String description = "Channel Description";
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, name, importance);
            channel.setDescription(description);
            // Register the channel with the system; you can't change the importance
            // or other notification behaviors after this
            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }

    }







}
