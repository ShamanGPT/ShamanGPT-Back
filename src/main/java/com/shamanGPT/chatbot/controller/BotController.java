package com.shamanGPT.chatbot.controller;

import io.github.flashvayne.chatgpt.service.ChatgptService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@Slf4j
@RestController
@RequestMapping("/bot")
public class BotController {
    @Autowired
    private final ChatgptService chatgptService;

    public BotController(ChatgptService chatgptService) {
        this.chatgptService = chatgptService;
    }

    @GetMapping("/send")
    public String send(@RequestParam String message){
        return chatgptService.sendMessage(message);
    }
}
