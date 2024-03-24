import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    private userService: UsersService,
  ) {}
  async create(createPostDto: CreatePostDto) {
    const { title, content, username } = createPostDto;

    const user = await this.userService.findOne(username);
    const post = new Post();
    post.title = title;
    post.content = content;
    post.user = user;
    return this.postsRepository.save(post);

    return 'This action adds a new post';
  }

  findAll() {
    return this.postsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
