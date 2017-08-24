function Shop() { //Todo not importyed yet
    this.items = ['bow', 'handgun'];
    this.costByItem = function (item) {
        switch (item) {
            case ('bow'):
                return 10;
            case ('handgun'):
                return 100;
        }
    }
}
