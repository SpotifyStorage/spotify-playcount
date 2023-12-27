import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
//import { TrackEntity } from "";

@Entity()
export class TrackPlayCountEntity {
    @PrimaryGeneratedColumn()
    id: number;

    //@ManyToOne(() => TrackEntity, (track) => track.trackUri)
    @Column()
    uri: string;
    
    @Column()
    playcount: number;

    @Column()
    date: string;
}