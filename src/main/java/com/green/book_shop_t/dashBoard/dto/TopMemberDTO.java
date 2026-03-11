package com.green.book_shop_t.dashBoard.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TopMemberDTO {

  private String memEmail;
  private int saleCntPerMember;
  private long salePerMember;

}
