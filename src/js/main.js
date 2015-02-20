(function() {

    class Person {

        constructor(args) {
            this.name = args.name;
            this.age = args.age;
        }

        render() {
            console.log(`${this.name} is ${this.age} years old`);
        }
    }

    var jamy = new Person({
        name: 'Jamy',
        age: 27
    });

    jamy.render();

    // Game here
})();
