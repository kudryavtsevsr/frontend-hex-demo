var hexApp = angular.module('hexApp', ['oitozero.ngSweetAlert'])

.controller('mainCtrl', ['$scope', 'SweetAlert', function($scope, SweetAlert) {
	$scope.color = "";
	$scope.cards = null;

	// Прочитать цвета
	$scope.readColors = function () {
		$scope.cards = window.localStorage.getItem('cards') ? angular.fromJson(window.localStorage.getItem('cards')) : [];
	}

	// Сохранить цвет
	$scope.saveColor = function () {
		if ($scope.color === "") { console.log("Enter color!"); return false } ; 
		console.log("color: ", $scope.color);
		var card = {
			"hex": $scope.color,
			"fave": false
		}
		$scope.cards.unshift(card);
		window.localStorage.setItem('cards', angular.toJson($scope.cards));
		$scope.color = "";
		$scope.colorForm.$setPristine();
	}

	// Удалить цвет
	$scope.delCard = function (index,hex) {
		console.log('index: ', index);
		SweetAlert.swal({
			title: "Действительно удалить цвет " + hex + " ?",
			type: "warning",
			showCancelButton: true,
			confirmButtonText: "Да",
			cancelButtonText: "Нет"
		}, function (isConfirm) {
			if (isConfirm) {
				$scope.cards.splice(index, 1);
				window.localStorage.setItem('cards', angular.toJson($scope.cards));
			} else {
				return false;
			}
		});
	}

	// Добавить цвет в избранные
	$scope.addToFav = function (index) {
		$scope.cards[index]["fave"] = $scope.cards[index]["fave"] ? false : true;
		console.log($scope.cards[index]["fave"]);
		window.localStorage.setItem('cards', angular.toJson($scope.cards));
	}
}]);
