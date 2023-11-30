import yargs from 'yargs';

import {changePassword, createSuperUser, runServer} from './cli';

yargs
    .strict()
    .command(
        'runserver [port] [host]',
        'Run server',
        (setup) => {
          setup
              .positional('port', {
                default: 8000,
                description: 'Port',
                type: 'number',
              })
              .positional('host', {
                default: '::',
                description: 'Host',
                type: 'string',
              });
        },
        async (args) => {
          await runServer(Number(args.port), args.host);
        },
    )
    .command(
        'createsuperuser [email] [firstName] [lastName] [password]',
        'Create super user',
        (setup) => {
          setup
              .positional('email', {
                description: 'Email',
                type: 'string',
              })
              .positional('firstName', {
                description: 'First name',
                type: 'string',
              })
              .positional('lastName', {
                description: 'Last name',
                type: 'string',
              })
              .positional('password', {
                description: 'Password',
                type: 'string',
              });
        },
        async (args) => {
          await createSuperUser(
              args.email,
              args.firstName,
              args.lastName,
              args.password,
          );
        },
    )
    .command(
        'changepassword [email] [password]',
        'Change password',
        (setup) => {
          setup
              .positional('email', {
                description: 'Email',
                type: 'string',
              })
              .positional('password', {
                description: 'Password',
                type: 'string',
              });
        },
        async (args) => {
          await changePassword(args.email, args.password);
        },
    ).argv;
