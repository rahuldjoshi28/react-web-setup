module.exports = {
    testPathIgnorePatterns: [
        '<rootDir>/node_modules/',
    ],
    collectCoverage: true,
    coverageReporters: ['html', 'text'],
    verbose: true,
    timers: 'fake',
    collectCoverageFrom: [
        'src/**/*.js',
        'src/**/*.jsx',
        '!**/*.style.js',
        '!dist/**/*.js',
    ],
    coverageThreshold: {
        global: {
            statements: 100,
            branches: 100,
            functions: 100,
            lines: 100
        }
    }
};
