module.exports = {
    env: {
        browser: true,
        es6: true,
        es2021: true
    },
    extends: ["airbnb-base", "prettier", "plugin:prettier/recommended"],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
    },
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module"
    },
    plugins: ["prettier"],
    rules: {
        "prettier/prettier": ["error"],
        "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
        "no-shadow": [
            "error",
            {
                allow: ["req", "res", "err"]
            }
        ],
        "valid-jsdoc": [
            "error",
            {
                requireReturn: true,
                requireReturnType: true,
                requireParamDescription: false,
                requireReturnDescription: true
            }
        ],
        "require-jsdoc": [
            "error",
            {
                require: {
                    FunctionDeclaration: true,
                    MethodDefinition: true,
                    ClassDeclaration: true
                }
            }
        ],
        "import/order": [
            "error",
            {
                groups: ["builtin", "external", "internal"]
            }
        ],
        "import/extensions": [
            "error",
            "ignorePackages",
            {
                js: "never",
                ts: "never"
            }
        ]
    },
    overrides: [
        {
            rules: {
                "no-undef": "off"
            }
        }
    ],
    settings: {
        "import/resolver": {
            node: {
                paths: ["."],
                extensions: [".js"]
            }
        }
    }
};
