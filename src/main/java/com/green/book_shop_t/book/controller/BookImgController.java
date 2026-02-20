package com.green.book_shop_t.book.controller;

import com.green.book_shop_t.book.service.BookImgService;
import com.green.book_shop_t.book.service.BookService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/imgs")
@RequiredArgsConstructor
public class BookImgController {

  private final BookImgService bookImgService;

}
