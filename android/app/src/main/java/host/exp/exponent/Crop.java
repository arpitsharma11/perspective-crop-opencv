package host.exp.exponent;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Environment;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableMap;

import org.json.JSONObject;
import org.opencv.android.Utils;
import org.opencv.core.CvType;
import org.opencv.core.Mat;
import org.opencv.core.Point;
import org.opencv.core.Rect;
import org.opencv.core.Size;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.URL;

public class Crop extends ReactContextBaseJavaModule {

    double p1x,p1y;
    double p2x,p2y;
    double p3x,p3y;
    double p4x,p4y;
    Point P1;
    Point P2;
    Point P3;
    Point P4;
    String imageUri;

    public Crop(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @ReactMethod void setPoints(ReadableMap p1,ReadableMap p2,ReadableMap p3,ReadableMap p4,String uri){
        P1 = new Point(p1.getDouble("x"),p1.getDouble("y"));
        P2 = new Point(p2.getDouble("x"),p2.getDouble("y"));
        P3 = new Point(p3.getDouble("x"),p3.getDouble("y"));
        P4 = new Point(p4.getDouble("x"),p4.getDouble("y"));
        imageUri = uri;
    }

    @ReactMethod
    public void demoFunction(Callback successCallback) {
        //System.out.println(P1 + " " + P2 + " " + P3 + " " + P4);
        System.out.println("Its working");
        Imgcodecs imageCodecs = new Imgcodecs();
        URI uri = URI.create(imageUri);
        System.out.println("uri" + imageUri);
        System.out.println("HI  " + uri.getPath());
        Mat mat = imageCodecs.imread(uri.getPath());
        System.out.println(mat.size());
        Mat src_mat=new Mat(4,1, CvType.CV_32FC2);
        Mat dst_mat=new Mat(4,1,CvType.CV_32FC2);

        System.out.println(P1 + " " + P2 + " " + P3 + " " + P4);
        src_mat.put(0,0,(int)P1.x,(int)P1.y, (int)P2.x,(int)P2.y, (int)P4.x,(int)P4.y, (int)P3.x,(int)P3.y);

        dst_mat.put(0,0, 0,0,mat.width(),0,0,mat.height(),mat.width(), mat.height());
        Mat perspectiveTransform=Imgproc.getPerspectiveTransform(src_mat, dst_mat);

        Mat dst=mat.clone();

        Imgproc.warpPerspective(mat, dst, perspectiveTransform, new Size(mat.width(),mat.height()));
        Imgcodecs.imwrite("/storage/emulated/0/DCIM/Camera/result2.jpg", dst);

        System.out.println("Done");
        successCallback.invoke(null,"hey");
    }

    @Override
    public String getName() {
        return "Crop";
    }
}
