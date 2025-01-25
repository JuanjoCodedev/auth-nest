import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('log')
export class LogEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  path: string;

  @Column({ type: 'varchar' })
  message: string;

  @Column({ type: "int2" })
  status_code: number;

  @Column({ type: 'varchar' })
  client_ip: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
