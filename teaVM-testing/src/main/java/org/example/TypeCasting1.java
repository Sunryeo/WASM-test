package org.example;

public class TypeCasting1 {
  public static String getPrint() {
    byte byteValue = 10;
    short shortValue = byteValue; // byte에서 short로 자동 변환
    int intValue = shortValue; // short에서 int로 자동 변환
    long longValue = intValue; // int에서 long으로 자동 변환

    return "longValue: " + longValue; // 출력을 문자열로 반환
  }
}
