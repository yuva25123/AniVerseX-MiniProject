package com.aniversex.controller;

import com.aniversex.model.Anime;
import com.aniversex.repository.AnimeRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/anime")
public class AnimeController {

    private final AnimeRepository animeRepository;

    public AnimeController(AnimeRepository animeRepository) {
        this.animeRepository = animeRepository;
    }

    @GetMapping
    public String listAnime(Model model) {
        model.addAttribute("animeList", animeRepository.findAll());
        return "anime-list";
    }

    @GetMapping("/new")
    public String showForm(Model model) {
        model.addAttribute("anime", new Anime());
        return "anime-form";
    }

    @PostMapping
    public String saveAnime(@ModelAttribute Anime anime) {
        animeRepository.save(anime);
        return "redirect:/anime";
    }
}
