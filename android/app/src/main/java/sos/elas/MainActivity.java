package sos.elas;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.provider.Settings;
import android.support.v4.app.ActivityCompat;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

import java.util.ArrayList;


public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    SharedPreferences prefs = null;
    prefs = getSharedPreferences("sos.elas", MODE_PRIVATE);

    Log.d(AccessibilityButtonService.TAG, "Activity onCreate");

    /*if (prefs.getBoolean("firstrun", true)) { //verifica se é a primeira vez rodando o app
      // Do first run stuff here then set 'firstrun' as false
      // using the following line to edit/commit prefs
      //openSettings();
      prefs.edit().putBoolean("firstrun", false).commit();
    }*/

    Intent backgroundService = new Intent(getApplicationContext(), AccessibilityButtonService.class);
    startService(backgroundService);

    if (!isAccessibilitySettingsOn(getApplicationContext())) {
      startActivity(new Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS));
    }

    // The request code used in ActivityCompat.requestPermissions()
    // and returned in the Activity's onRequestPermissionsResult()
    int PERMISSION_ALL = 1;
    String[] PERMISSIONS = {
            android.Manifest.permission.FOREGROUND_SERVICE,
            android.Manifest.permission.INTERNET,
            android.Manifest.permission.WRITE_EXTERNAL_STORAGE,
            android.Manifest.permission.READ_EXTERNAL_STORAGE,
            android.Manifest.permission.ACCESS_COARSE_LOCATION,
            android.Manifest.permission.ACCESS_FINE_LOCATION,
            android.Manifest.permission.ACCESS_NETWORK_STATE,
            android.Manifest.permission.SEND_SMS,
            android.Manifest.permission.CALL_PHONE,
    };

    if (!hasPermissions(this, PERMISSIONS)) {
      ActivityCompat.requestPermissions(this, PERMISSIONS, PERMISSION_ALL);
    }
    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      // Ex: add(TotallyAwesomePlugin.class);
      add(callbackVolumeButton.class); //plugin custom
    }});

  }
  /*
  public void openSettings() {
    Intent intent = new Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS);
    startActivity(intent);
  }*/

  // To check if service is enabled
  private boolean isAccessibilitySettingsOn(Context mContext) {
    int accessibilityEnabled = 0;
    final String service = getPackageName() + "/" + AccessibilityButtonService.class.getCanonicalName();
    String TAG ="";
    try {
      accessibilityEnabled = Settings.Secure.getInt(
              mContext.getApplicationContext().getContentResolver(),
              android.provider.Settings.Secure.ACCESSIBILITY_ENABLED);
      Log.v(TAG, "accessibilityEnabled = " + accessibilityEnabled);
    } catch (Settings.SettingNotFoundException e) {
      Log.e(TAG, "Error finding setting, default accessibility to not found: "
              + e.getMessage());
    }
    TextUtils.SimpleStringSplitter mStringColonSplitter = new TextUtils.SimpleStringSplitter(':');

    if (accessibilityEnabled == 1) {
      Log.v(TAG, "***ACCESSIBILITY IS ENABLED*** -----------------");
      String settingValue = Settings.Secure.getString(
              mContext.getApplicationContext().getContentResolver(),
              Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES);
      if (settingValue != null) {
        mStringColonSplitter.setString(settingValue);
        while (mStringColonSplitter.hasNext()) {
          String accessibilityService = mStringColonSplitter.next();

          Log.v(TAG, "-------------- > accessibilityService :: " + accessibilityService + " " + service);
          if (accessibilityService.equalsIgnoreCase(service)) {
            Log.v(TAG, "We've found the correct setting - accessibility is switched on!");
            return true;
          }
        }
      }
    } else {
      Log.v(TAG, "***ACCESSIBILITY IS DISABLED***");
    }

    return false;
  }

  public static boolean hasPermissions(Context context, String... permissions) {
    if (context != null && permissions != null) {
      for (String permission : permissions) {
        if (ActivityCompat.checkSelfPermission(context, permission) != PackageManager.PERMISSION_GRANTED) {
          return false;
        }
      }
    }
    return true;
  }
}
