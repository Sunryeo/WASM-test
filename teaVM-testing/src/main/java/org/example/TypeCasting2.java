package org.example;

public class TypeCasting2 {
    public static String getPrint() {
        int intValue = 100;
        float floatValue = intValue;    // int에서 float로 자동 변환
        double doubleValue = intValue; // int에서 double로 자동 변환

        return "floatValue: " + floatValue + "\ndoubleValue: " + doubleValue; // 출력을 문자열로 반환
    }
}