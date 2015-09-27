djello.factory('boardService', ['Restangular', function(Restangular){
  var boards = {};

  function getBoards() {
    Restangular.all('boards').getList().then(function(boardList){
      boards.boardList = boardList;
    }, function(error){
      console.log('Fail to get boards: ', error);
    })
  }

  function createBoard(boardForm) {
    Restangular.all('boards').post(boardForm).then(function(board){
      boards.boardList.push(board);
      for (var key in boardForm) {
        boardForm[key] = null;
      }
    }, function(error){
      console.log('Create board Failed: ', error);
    })
  }

  function removeBoard(board) {
    board.remove().then(function(){
      boards.boardList.splice(boards.boardList.indexOf(board), 1)
    }, function(error){
      console.log('Fail to remove board: ', error);
    })
  }

  return {
    boards: boards,
    getBoards: getBoards,
    createBoard: createBoard,
    removeBoard: removeBoard
  } 
}])