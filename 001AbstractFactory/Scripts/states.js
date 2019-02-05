//var keyFilterWord;
//var serverFiltration = "";

//var clearCarriersList = () => {
//    document.writeln("clear carrier list<br />");
//}

//var Context = function (state) {
//    this.state = state;

//    this.currentState = function () {
//        document.writeln("current state - " + this.state + "<br />");
//    }

//    this.Request = function (filter) {
//        this.state.handle(this, filter);
//    }
//}

//var ClearCarrierList = function () {
//    this.handle = function (context) {
//        context.currentState();
//        clearCarriersList();
//        context.state = new SetKeyFilterWord();
//    }
//}

//var SetKeyFilterWord = function () {
//    this.handle = function (context, filter) {
//        context.currentState();
//        serverFiltration = true;
//        keyFilterWord = filter;
//        context.state = new ExistKeyFilterWord();
//    }
//}

//var ExistKeyFilterWord = function () {
//    this.handle = function (context, filter) {
//        context.currentState();

//        if (keyFilterWord.startsWith(filter)) {
//            context.state = new FilterEqualsKeyFilterWord();
//        }
//        else {
//            keyFilterWord = filter;
//        }
//    }
//}

//var FilterEqualsKeyFilterWord = function () {
//    this.handle = function (context) {
//        context.currentState();
//        serverFiltration = false;
//    }
//}

//var GroupSelect = function () {
//    this.handle = function (context, groupName) {
//        context.currentState();
//        serverFiltration = false;
//        document.writeln("load carrier from - " + groupName + "<br />");
//    }
//}

//var GroupInNoLongerSelected = function () {
//    this.handle = function (context) {
//        context.currentState();
//        context.state = new ClearCarrierList();
//    }
//}

//----------------------------------------------------------------------------------
        //var Context = function (state) {
        //    this.state = state;

        //    this.Request = function () {
        //        this.state.handle(this);
        //    }
        //}

        //var State1 = function () {
        //    this.handle = function (context) {
        //        document.writeln("go to state2<br />");
        //        context.state = new State2(context);
        //    }
        //}

        //var State2 = function () {
        //    this.handle = function (context) {
        //        document.writeln("go to state1<br />");
        //        context.state = new State1(context);
        //    }
        //}

        //var context = new Context(new State1());
        //context.Request();
        //context.Request();
        //context.Request();

//----------------------------------------------------------------------------------

//var clearCarriersList = () => {
//    console.log("clear carrier list");
//}

//var Context = function (state) {
//    this.state = state;

//    this.currentState = function () {
//        $scope.currentState = this.state.name;
//    }

//    this.Request = function (filter) {
//        this.state.handle(this, filter);
//    }
//}

class Context {
    constructor(state) {
        this.state = state;
    }

    currentState() {
        $scope.currentState = this.state.name;
    }

    Request(filter) {
        this.state.handle(this, filter);
    }
}

class ClearCarrierList {
    constructor() {
        this.name = "clear";
    }

    handle(context) {
        clearCarriersList();
        $scope.btnText = "Enter filter";
        context.state = new SetKeyFilterWord();
    }
}

class SetKeyFilterWord {
    constructor() {
        this.name = "set key filter word";
    }

    handle(context, filter) {
        $scope.serverFiltration = true;
        $scope.keyFilterWord = filter;
        $scope.btnText = "Enter new filter";
        context.state = new ExistKeyFilterWord();
    }
}

class ExistKeyFilterWord {
    constructor() {
        this.name = "exist key filter word";
    }

    handle(context, filter) {
        if (filter != "") {
            if (filter.startsWith($scope.keyFilterWord)) {
                $scope.serverFiltration = false;
            }
            else {
                $scope.keyFilterWord = filter;
                context.state = new SetKeyFilterWord();
                context.Request(filter);
            }
        }
    }
}

var GroupSelected = function () {
    this.name = "group selected";

    this.handle = function (context, groupName) {
        $scope.serverFiltration = false;
        $scope.keyGroupName = groupName;
        context.state = new GroupSelectedSetKeyFilterWord();
    }
}

var GroupSelectedSetKeyFilterWord = function () {
    this.name = "group selected and set key filter word";

    this.handle = function (context, filter) {
        $scope.keyFilterWord = filter;
    }
}

var context = new Context(new ClearCarrierList());