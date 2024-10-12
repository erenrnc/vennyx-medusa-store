import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Pokeitem {
    @PrimaryGeneratedColumn()
    id;

    @Column({ type: "varchar" })
    name;

    @Column({ type: "varchar" })
    img;

    @Column({ type: "varchar" })
    type;
}

export default Pokeitem
