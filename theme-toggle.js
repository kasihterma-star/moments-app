
(function(){
  const KEY = "moremomentsTheme";

  function currentTheme(){
    return document.documentElement.getAttribute("data-theme") || "light";
  }

  function applyTheme(theme, animate){
    if(animate){
      document.documentElement.classList.add("mm-theme-changing");
    }

    document.documentElement.setAttribute("data-theme", theme);

    try{
      localStorage.setItem(KEY, theme);
    }catch(error){}

    const knob = document.querySelector(".mm-theme-knob");
    if(knob){
      knob.textContent = theme === "dark" ? "☾" : "☀";
    }

    window.setTimeout(function(){
      document.documentElement.classList.remove("mm-theme-changing");
    }, 620);
  }

  function getInitialTheme(){
    try{
      const saved = localStorage.getItem(KEY);
      if(saved === "light" || saved === "dark"){
        return saved;
      }
    }catch(error){}

    if(
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ){
      return "dark";
    }

    return "light";
  }

  function init(){
    applyTheme(getInitialTheme(), false);

    if(document.querySelector(".mm-theme-switch")){
      return;
    }

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "mm-theme-switch";
    toggle.setAttribute("aria-label", "Ganti mode terang atau gelap");
    toggle.setAttribute("title", "Ganti mode terang / gelap");

    const sun = document.createElement("span");
    sun.className = "mm-theme-icon mm-theme-sun";
    sun.textContent = "☀";

    const moon = document.createElement("span");
    moon.className = "mm-theme-icon mm-theme-moon";
    moon.textContent = "☾";

    const knob = document.createElement("span");
    knob.className = "mm-theme-knob";
    knob.textContent = currentTheme() === "dark" ? "☾" : "☀";

    toggle.appendChild(sun);
    toggle.appendChild(moon);
    toggle.appendChild(knob);

    toggle.addEventListener("click", function(){
      const next =
        currentTheme() === "dark"
          ? "light"
          : "dark";

      applyTheme(next, true);
    });

    document.body.appendChild(toggle);
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", init);
  }else{
    init();
  }
})();
