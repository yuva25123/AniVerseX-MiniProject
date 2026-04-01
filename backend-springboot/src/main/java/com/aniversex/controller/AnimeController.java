package com.aniversex.controller;

import com.aniversex.model.Anime;
import com.aniversex.repository.AnimeRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
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
    public String redirectRoot() {
        return "redirect:/anime/list";
    }

    @GetMapping("/list")
    public String listAnime(Model model) {
        model.addAttribute("animeList", animeRepository.findAll());
        return "anime-list";
    }

    @GetMapping("/new")
    public String showCreateForm(Model model) {
        model.addAttribute("anime", new Anime());
        model.addAttribute("formMode", "create");
        return "anime-form";
    }

    @GetMapping("/edit/{id}")
    public String showEditForm(@PathVariable Integer id, Model model) {
        Anime anime = animeRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Invalid anime id: " + id));
        model.addAttribute("anime", anime);
        model.addAttribute("formMode", "edit");
        return "anime-form";
    }

    @PostMapping
    public String saveAnime(@ModelAttribute Anime anime) {
        animeRepository.save(anime);
        return "redirect:/anime/list";
    }

    @GetMapping("/delete/{id}")
    public String deleteAnime(@PathVariable Integer id) {
        animeRepository.deleteById(id);
        return "redirect:/anime/list";
    }
}
