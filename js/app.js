(function(){
  var app = angular.module('wikiApp',[]);
    app.controller('wiki', ['$scope', '$http', function($scope, $http){
         var ctrl = this;
         ctrl.search = function(keyEvent) {
             if(keyEvent.which === 13) {
                  $http.jsonp("https://en.wikipedia.org/w/api.php?action=opensearch&search="+$scope.ctrl.term+"&format=json&callback=JSON_CALLBACK")
                  .then().success(function(res) {
                      $scope.values = [];
                      for(let i=0; i<res[1].length; i++) {
                          let entry = {};
                          entry.title = res[1][i];
                          entry.desc = res[2][i];
                          entry.link = res[3][i];
                          $scope.values.push(entry);
                      }
                  });
             }
         };

         ctrl.navigate = function(url) {
             window.open(url, '_blank');
         };
    }]);
})();
