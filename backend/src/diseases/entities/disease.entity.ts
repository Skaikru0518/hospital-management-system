import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('diseases')
export class Disease {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  code: string;

  @Column('text')
  short_desc: string;

  @Column('text')
  long_desc: string;
}
