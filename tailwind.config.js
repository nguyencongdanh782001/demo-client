module.exports = {
  content: [],
  theme: {
    extend: {
      flexgrow: {
        2: 2,
        3: 3,
      },
      keyframes: {
        dropdownMenu: {
          "0%": {
            transform: "scaleY(0)",
          },
          " 80%": {
            transform: "scaleY(1.1)",
          },
          "100%": {
            transform: "scaleY(1)",
          },
        },
        bounceItem: {
          "0%": {
            transform: "translateY(60px)",
            opacity: "0",
            visibility: "hidden",
          },
          " 90%": {
            opacity: "0.7",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
            visibility: "visible",
          },
        },
        hideBanner: {
          "0%": {
            transform: "translateY(0)",
          },
          "100%": {
            transform: "translateY(-108px)",
          },
        },

        showBanner: {
          "0%": {
            transform: "translateY(-108px)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },

        hideHeader: {
          "0%": {
            transform: "translateY(0)",
            opacity: "1",
          },
          "50%": {
            opacity: "0.1",
          },
          "100%": {
            transform: "translateY(-136px)",
            opacity: "0",
          },
        },

        showHeader: {
          "0%": {
            transform: "translateY(-136px)",
            opacity: "0",
          },
          "50%": {
            opacity: "0.75",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },

        showMenuMobile: {
          "0%": {
            transform: "translateX(-100vw)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },

        hideMenuMobile: {
          "0%": {
            transform: "translateX(0)",
            opacity: "1",
          },
          "100%": {
            transform: "translateX(-100vw)",
            opacity: "0",
            display: "none",
          },
        },

        showDropMenu: {
          "0%": {
            opacity: "0",
            transform: "scaleY(0)",
            height: "0",
          },

          "100%": {
            opacity: "1",
            transform: "scaleY(1)",
            height: "auto",
          },
        },

        hideDropMenu: {
          "0%": {
            opacity: "1",
            transform: "scaleY(1)",
            height: "auto",
          },

          "100%": {
            opacity: "0",
            transform: "scaleY(0)",
            height: "0",
          },
        },

        showSiderDropMenu: {
          "0%": {
            opacity: "0",
            transform: " scaleY(0)",
            height: "0",
          },

          "100%": {
            opacity: "1",
            transform: " scaleY(1)",
            height: "auto",
          },
        },

        hideSiderDropMenu: {
          "0%": {
            opacity: "1",
            transform: "scaleY(1)",
            height: "auto",
          },

          "100%": {
            opacity: "0",
            transform: "scaleY(0)",
            height: "0",
          },
        },
      },
      animation: {
        bounceItem: "bounceItem 0.5s ease-out forwards",
        dropdownMenu: "dropdownMenu 0.3s ease-in-out forwards",
        hideBanner: "hideBanner 0.5s ease forwards",
        showBanner: "showBanner 0.5s ease forwards",
        hideHeader: "hideHeader 0.5s ease forwards",
        showHeader: "showHeader 0.5s ease forwards",
        showMenuMobile: "showMenuMobile 0.5s ease forwards",
        hideMenuMobile: "hideMenuMobile 0.5s ease forwards",
        showDropMenu: "showDropMenu 400ms ease-in-out forwards",
        hideDropMenu: "hideDropMenu 400ms ease-in-out forwards",
        showSiderDropMenu: "showSiderDropMenu 300ms ease-in-out forwards",
        hideSiderDropMenu: "hideSiderDropMenu 300ms ease-in-out forwards",
      },
    },
  },
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  plugins: [],
};
