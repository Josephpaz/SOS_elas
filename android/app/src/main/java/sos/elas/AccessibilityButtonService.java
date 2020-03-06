package sos.elas;

import android.accessibilityservice.AccessibilityService;
import android.app.Service;
import android.content.Intent;
import android.os.Handler;
import android.os.IBinder;
import android.provider.Settings;
import android.telephony.SmsManager;
import android.util.Log;
import android.view.KeyEvent;
import android.view.accessibility.AccessibilityEvent;
import android.widget.Toast;

public class AccessibilityButtonService extends AccessibilityService {

    public final static String TAG = "SOS_VOLUME_BUTTONS";

    private int mCounter = 0;
    private Handler mHandler = new Handler();

    private int delayMilis = DefaultPreferences.delaySeconds * 1000;

    private Runnable mResetCounter = new Runnable() {
        @Override
        public void run() {
            Log.d(TAG, "reset count");
            mCounter = 0;
            GlobalVar.flagEmergencia = false; //flag
        }
    };

    private void timesPressedHandle (){
        if (mCounter == 0){
            Log.d(TAG, "start  count");
            mHandler.postDelayed(mResetCounter, delayMilis);
        }

        mCounter++;

        if (mCounter == DefaultPreferences.timesPressed){
            mHandler.removeCallbacks(mResetCounter);
            mCounter = 0;
            Log.d(TAG, "Sending SMS mensage for your contacts" + " - " + mCounter);
            Toast.makeText(getApplicationContext(), "Enviando SMS para seus contatos de emergência!", Toast.LENGTH_LONG).show();
            //passando a flag pra outra activity
            GlobalVar.flagEmergencia = true; //flag
        }

        Log.d(TAG, "Counter" + " - " + mCounter);
    }

    public AccessibilityButtonService() {

    }

    @Override
    protected void onServiceConnected() {
        super.onServiceConnected();
        Log.d(TAG, "service is connected");
    }

    @Override
    public void onAccessibilityEvent(AccessibilityEvent accessibilityEvent) {
        Log.d(TAG, "onAccessibilityEvent" + accessibilityEvent.toString());

    }

    @Override
    public void onInterrupt() {

    }

    // here you can intercept the keyevent
    @Override
    protected boolean onKeyEvent(KeyEvent event) {
        handleKeyEvent(event);
        return super.onKeyEvent(event);
    }

    private boolean handleKeyEvent(KeyEvent event) {
        int action = event.getAction();
        int keyCode = event.getKeyCode();
        if (action == KeyEvent.ACTION_DOWN) {
            switch (keyCode) {
                case KeyEvent.KEYCODE_VOLUME_DOWN:
                    Log.d(TAG, "KEYCODE_VOLUME_DOWN");

                    timesPressedHandle();
                    return true;

                case KeyEvent.KEYCODE_VOLUME_UP: {
                    timesPressedHandle();
                    Log.d(TAG, "KEYCODE_VOLUME_UP");
                    return true;
                }
            }
        }
        return false;
    }


}
