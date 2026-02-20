package com.green.book_shop_t.book.service;

import com.green.book_shop_t.book.mapper.BookImgMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookImgService {

  private final BookImgMapper bookImgMapper;

}
