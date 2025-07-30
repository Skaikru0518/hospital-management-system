import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

@Entity('patients')
export class Patient {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty()
  @Column({ name: 'insurance_no', length: 50, nullable: true })
  insurance_no: string;

  @ApiProperty()
  @Column({ length: 255, nullable: true })
  address: string;

  @ApiProperty()
  @Column({ name: 'date_of_birth', type: 'date', nullable: true })
  birth: Date;

  @ApiProperty()
  @Column({ length: 30, nullable: true })
  phone: string;
}
