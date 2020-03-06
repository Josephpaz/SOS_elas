package sos.elas;

import android.content.Intent;
import android.os.Bundle;
import android.provider.Settings;
import android.util.Log;
import android.view.View;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

import java.util.ArrayList;


public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    Intent backgroundService = new Intent(getApplicationContext(), AccessibilityButtonService.class);
    startService(backgroundService);

    Log.d(AccessibilityButtonService.TAG, "Activity onCreate");
    openSettings();

    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      // Ex: add(TotallyAwesomePlugin.class);
    }});
  }

  public void openSettings(){
    Intent intent = new Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS);
    //startActivity(intent);
  }

}
