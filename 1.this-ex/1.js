class Company {
    constructor() {
        this.departments = []
    }
    addEmployee(username, salary, position, department) {
        if (!username || !position || !department) {
            throw new Error('Invalud input!')
        }
        if (!salary || salary < 0 || salary === null || salary === undefined) {
            throw new Error('Invalud input!')
        }
        let existing = this.departments.find(n => n.name === department)

        if (!existing) {
            existing = {
                name: department,
                empployees: [],
                averageSalary: function () {
                    return this.empployees.reduce((a, b) => a + b.salary, 0) / this.empployees.length
                }
            }
            this.departments.push(existing)
        }
        existing.empployees.push({ username, salary, position })
        return `New employee is hired. Name: ${username}. Position: ${position}`


    }
    bestDepartment() {
        //console.log(this.departments);

        let [best] = [...this.departments].sort((a,b)=>{ return b.averageSalary() - a.averageSalary()})

        let output = `Best department is ${best.name}\n`
        output += `Average salary is ${best.averageSalary().toFixed(2)}\n`
        output += [...best.empployees].sort((a,b)=>b.salary - a.salary || a.username.localeCompare(b.username))
        .map(e => `${e.username} ${e.salary} ${e.position}`).join('\n')
        return output

        //best.empployees.sort((a,b)=> b.salary-a.salary || a.username.localeCompare(b.username))
        //console.log(best.empployees);


    }
}


let c = new Company();

c.addEmployee("Stanimir", 2000, "engineer", "Human resources");


c.addEmployee("Pesho", 1500, "electrical engineer", "Construction");
c.addEmployee("Slavi", 500, "dyer", "Construction");
c.addEmployee("Stan", 2000, "architect", "Construction");
c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing");
c.addEmployee("Pesho", 1000, "graphical designer", "Marketing");
c.addEmployee("Gosho", 1350, "HR", "Human resources");

console.log(c.bestDepartment());
