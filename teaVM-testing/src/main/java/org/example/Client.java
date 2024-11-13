package org.example;

import org.teavm.jso.browser.Window;

public class Client {
  public static void main(String[] args) {
    var document = Window.current().getDocument();
    var div = document.createElement("div");
    div.appendChild(document.createTextNode("TeaVM generated element"));
    document.getBody().appendChild(div);

    System.out.println(TypeCasting1.getPrint());
    System.out.println(TypeCasting2.getPrint());
  }
}
