import { Employee } from "src/employee/employee";
import { Column } from "typeorm";

export class Teacher extends Employee {
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ nullable: true })
    patronymic: string;

    @Column()
    email: string;

    @Column()
    phoneNumber: string;
}
