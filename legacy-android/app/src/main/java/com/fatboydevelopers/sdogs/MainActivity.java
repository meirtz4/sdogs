package com.fatboydevelopers.sdogs;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        TextView F1Sunday = (TextView)findViewById(R.id.F1Sunday);
        TextView F1Monday = (TextView)findViewById(R.id.F1Monday);
        TextView F1Tuesday = (TextView)findViewById(R.id.F1Tuesday);
        TextView F1Wednesday = (TextView)findViewById(R.id.F1Wednesday);
        TextView F1Thursday = (TextView)findViewById(R.id.F1Thursday);
        TextView F2Sunday = (TextView)findViewById(R.id.F2Sunday);
        TextView F2Monday = (TextView)findViewById(R.id.F2Monday);
        TextView F2Tuesday = (TextView)findViewById(R.id.F2Tuesday);
        TextView F2Wednesday = (TextView)findViewById(R.id.F2Wednesday);
        TextView F2Thursday = (TextView)findViewById(R.id.F2Thursday);

        DogsModel dogs = (new DogsClient()).GetAll();
        F1Monday.setText("Polly\nRick");


    }
}
