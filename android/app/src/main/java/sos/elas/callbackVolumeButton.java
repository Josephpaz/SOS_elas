package sos.elas;

import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;

import com.getcapacitor.JSObject;


@NativePlugin()
public class callbackVolumeButton extends Plugin {

    @PluginMethod()
    public void ehEmergencia(PluginCall call) {
        //String message = call.getString("message");
        // More code here...

        JSObject ret = new JSObject();
        ret.put("flag", GlobalVar.flagEmergencia);

        call.success(ret);
    }
}
