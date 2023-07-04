window.SanPhamController = function ($scope, $http,$routeParams){
    $scope.listSP = [];
    $http.get('  http://localhost:3000/sanpham').then(function(response){
        if(response.status === 200){
            $scope.listSP = response.data;
        }
    });
    
    $scope.detailSP = function (id) {
        $http.
        get(' http://localhost:3000/sanpham/' + id)
        .then(function(response){
        if(response.status === 200){
            $scope.id = response.data.id;
            $scope.image = response.data.image;
            $scope.name = response.data.name;
            $scope.priceGoc = response.data.priceGoc;
            $scope.price = response.data.price;
            $scope.sale = response.data.sale;
        }
    });
    };

    // $scope.findObjects = $scope.list.findIndex(function (obj) {
    //     let url = $location.absUrl().split("/");
    //     let id = url[url.length - 1];
    //     return obj.id === id;
    //   });

    $scope.addSP = function(){
       if ($scope.id === "" || $scope.name === "" || $scope.price === "" || $scope.sale === "" || $scope.priceGoc === "") {
        alert("Ko dc de trong");
       } else {
        $http.post(' http://localhost:3000/sanpham',{
            id : $scope.id,
            image: $scope.image,
            name : $scope.name,
            priceGoc: $scope.priceGoc,
            price: $scope.price,
            sale: $scope.sale,
        })
        .then(function(response){
            if(response.status === 201){
                alert('Thêm Sản Phẩm Thành Công !');
            }
        },function(error){
            alert('Thêm Thất Bại !');
        });
       }
        
    };

    $scope.updateSP = function(){
        $http.put('  http://localhost:3000/sanpham/' + $scope.id,{
            id : $scope.id,
            image: $scope.image,
            name : $scope.name,
            priceGoc: $scope.priceGoc,
            price: $scope.price,
            sale: $scope.sale,
        })
        .then(function(response){
            if(response.status === 200){
                alert('Update Sản Phẩm Thành Công !');
            }
        },function(error){
            alert('Update Thất Bại !');
        });
    };


    $scope.deleteSP = function(id){
        $http.delete(' http://localhost:3000/sanpham/' + id).then(function(response){
            if(response.status === 200){
                alert('Delete Sản Phẩm Thành Công !');
                $scope.listSP = response.data;
            }
        })
    };


    $scope.$on("$routeChangeSuccess", function () {
        if ($routeParams.id) {
          $http
            .get(' http://localhost:3000/sanpham/'  + $routeParams.id)
            .then(function (response) {
              $scope.sanpham = response.data;
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      });

};