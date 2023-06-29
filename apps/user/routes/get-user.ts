import joi from 'joi';

import { wrap } from '@libs/core/wrappers';

import { Request, Response } from '@libs/core/helpers/types';

const getUserSchemas = {
    reqQuery: joi.object().length(0),
    reqBody: joi.object().length(0),
};

function getUser(_req: Request, res: Response) {
    res.send(res.locals.user);
}

export default wrap(getUser, {
    catch: true,
    authedOnly: true,
    validate: getUserSchemas,
});
