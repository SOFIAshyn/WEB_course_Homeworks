function convertObjectToArray(obj) {
    return Object.keys(obj).map(function (key) {
        return [key, obj[key]];
    });
}

// var obj = { 1: 2, 2: 3, 3:4, 4:5, "key_name": "key_value" };
// convertObjectToArray(obj);