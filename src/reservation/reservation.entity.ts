import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Amenity } from './amenity.entity';
import { User } from '../user/user.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'amenity_id' })
  amenityId: number;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => Amenity, (amenity) => amenity.reservations)
  @JoinColumn({ name: 'amenity_id' })
  amenity: Amenity;

  @ManyToOne(() => User, (user) => user.reservations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'start_time' })
  startTime: Date;

  @Column({ name: 'end_time' })
  endTime: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
