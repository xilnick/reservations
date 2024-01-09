import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { ReservationService } from '../reservation/reservation.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Reservation } from '../reservation/reservation.entity';
import { Repository } from 'typeorm';

describe('UserController', () => {
  let controller: UserController;
  let service: ReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        ReservationService,
        { provide: getRepositoryToken(Reservation), useClass: Repository },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<ReservationService>(ReservationService);
  });

  it('group reservations by day', async () => {
    const mockReservations: Reservation[] = [
      { id: 1, startTime: new Date('2023-01-01T10:00:00Z') } as Reservation,
      { id: 2, startTime: new Date('2023-01-01T15:00:00Z') } as Reservation,
      { id: 3, startTime: new Date('2023-01-02T10:00:00Z') } as Reservation,
    ];
    jest
      .spyOn(service, 'findUserReservations')
      .mockResolvedValue(mockReservations);

    const result = await controller.getUserReservationsDayGrouped(1);

    expect(result).toEqual({
      'Sat Jan 01 2023': [mockReservations[0], mockReservations[1]],
      'Sun Jan 02 2023': [mockReservations[2]],
    });
  });
});
