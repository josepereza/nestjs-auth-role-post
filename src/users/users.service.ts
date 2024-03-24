import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Post } from 'src/posts/entities/post.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  findAll() {
    return this.usersRepository.find({
      relations: {
        posts: true,
      },
    });
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOneBy({ username: email });
  }

  async findOne(username: string) {
    const user = await this.usersRepository.findOneBy({ username });
    if (!user) {
      throw new NotFoundException('usuario no existe');
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update({ id }, { ...updateUserDto });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
