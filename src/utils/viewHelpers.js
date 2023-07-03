exports.getDifficultyOptions = (platform) => {
    const titles = [
        '...',
        'PC',
        'XBOX',
        'Nintendo',
        'PS4',
        'PS5',
    ];
    const options = titles.map(( title, index) => ({
        title: ` ${title}`,
        value: title,
        selected: platform == title
    }));

    return options;
}