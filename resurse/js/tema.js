// Function to set the theme based on localStorage or default
function setThemeFromStorage() {
    let tema = localStorage.getItem("tema");
    if (tema === "dark") {
        document.body.classList.remove("light");
        document.body.classList.add("dark");
    } else if (tema === "light") {
        document.body.classList.remove("dark");
        document.body.classList.add("light");
    } else {
        // If no theme is set or invalid, revert to default (body)
        document.body.classList.remove("dark");
        document.body.classList.remove("light");
    }
}

// Event listener when DOM content is loaded
window.addEventListener("DOMContentLoaded", function(){
    setThemeFromStorage(); // Set initial theme based on localStorage

    // Select element change event listener
    document.getElementById("schimba_tema").addEventListener("change", function() {
        let selectedTheme = this.value; // Get the selected theme from <select>

        // Apply the selected theme
        if (selectedTheme === "dark") {
            document.body.classList.remove("light");
            document.body.classList.add("dark");
            localStorage.setItem("tema", "dark");
        } else if (selectedTheme === "light") {
            document.body.classList.remove("dark");
            document.body.classList.add("light");
            localStorage.setItem("tema", "light");
        } else {
            // Default theme (body)
            document.body.classList.remove("dark");
            document.body.classList.remove("light");
            localStorage.removeItem("tema");
        }
    });
});
