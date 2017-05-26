module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "env" : {
        "browser" : true
    },
    "rules" : {
        "max-len" : ["error", 150],
        "import/first" : ["error", { 'absolute-first' : true }],
        "jsx-a11y/href-no-hash" : ["off"]
    }
};
