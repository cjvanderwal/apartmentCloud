// borrowed from http://stackoverflow.com/questions/18381944/ng-options-and-unique-filter-not-displaying-angular-js
app.filter('unique', function() {
    return function(input) {
        var unique = {};
        var uniqueList = [];
        if (input === undefined) {
            return [];
        }
        for(var i = 0; i < input.length; i++){
            if(typeof unique[input[i].company] == "undefined"){
                unique[input[i].company] = "";
                uniqueList.push(input[i].company);
            }
        }
        return uniqueList;
    };
});
