import { ApiProperty } from '@nestjs/swagger';

export class ValidationErrorResponseDto {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: '2025-01-07T12:00:00.000Z' })
  timestamp: string;

  @ApiProperty({ example: '/api/auth/register' })
  path: string;

  @ApiProperty({
    oneOf: [
      { type: 'string' },
      { type: 'object' }
    ],
    example: {
      message: [
        'email must be an email',
        'password must be longer than or equal to 6 characters',
      ],
      error: 'Bad Request',
      statusCode: 400,
    },
    description: 'Error response from HttpException.getResponse()',
  })
  response: string | object;
}

export class ConflictErrorResponseDto {
  @ApiProperty({ example: 409 })
  statusCode: number;

  @ApiProperty({ example: '2025-01-07T12:00:00.000Z' })
  timestamp: string;

  @ApiProperty({ example: '/api/auth/register' })
  path: string;

  @ApiProperty({
    oneOf: [
      { type: 'string' },
      { type: 'object' }
    ],
    example: {
      message: 'Email already exists',
      error: 'Conflict',
      statusCode: 409,
    },
    description: 'Error response from HttpException.getResponse()',
  })
  response: string | object;
}

export class UnauthorizedErrorResponseDto {
  @ApiProperty({ example: 401 })
  statusCode: number;

  @ApiProperty({ example: '2025-01-07T12:00:00.000Z' })
  timestamp: string;

  @ApiProperty({ example: '/api/auth/login' })
  path: string;

  @ApiProperty({
    oneOf: [
      { type: 'string' },
      { type: 'object' }
    ],
    example: {
      message: 'Invalid credentials',
      error: 'Unauthorized',
      statusCode: 401,
    },
    description: 'Error response from HttpException.getResponse()',
  })
  response: string | object;
}

export class InternalServerErrorResponseDto {
  @ApiProperty({ example: 500 })
  statusCode: number;

  @ApiProperty({ example: '2025-01-07T12:00:00.000Z' })
  timestamp: string;

  @ApiProperty({ example: '/api/auth/register' })
  path: string;

  @ApiProperty({
    oneOf: [
      { type: 'string' },
      { type: 'object' }
    ],
    example: 'Internal Server Error',
    description: 'Error response - defaults to "Internal Server Error" string',
  })
  response: string | object;
}

export class PrismaValidationErrorResponseDto {
  @ApiProperty({ example: 422 })
  statusCode: number;

  @ApiProperty({ example: '2025-01-07T12:00:00.000Z' })
  timestamp: string;

  @ApiProperty({ example: '/api/auth/register' })
  path: string;

  @ApiProperty({
    oneOf: [
      { type: 'string' },
      { type: 'object' }
    ],
    example: 'Invalid prisma.user.create() invocation...',
    description: 'Prisma validation error message with newlines replaced by spaces',
  })
  response: string | object;
}
