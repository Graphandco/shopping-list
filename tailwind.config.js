/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                title: ['"Comfortaa"', "sans-serif"],
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        styled: true,
        themes: true,
        base: true,
        utils: true,
        logs: true,
        rtl: false,
        prefix: "",
        themes: [
            "dark",
            {
                dark: {
                    ...require("daisyui/src/colors/themes")[
                        "[data-theme=dark]"
                    ],
                    // primary: "#1f242e",
                    // "primary-focus": "#232934",
                    primary: "#60a5fa",
                    "primary-focus": "#232934",
                },
            },
        ],
    },
};
