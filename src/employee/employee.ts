import { AbstractEntityClass } from "src/database/AbstractEntityClass";
import { Entity } from "typeorm";

@Entity()
export class Employee extends AbstractEntityClass<Employee> {

    
}