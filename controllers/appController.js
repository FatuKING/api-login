import jwt from 'jsonwebtoken'

export class AppController {
  constructor ({ appModel }) {
    this.appModel = appModel
  }

  register = async (req, res) => {
    const { email, password } = req.body

    try {
      if (typeof email !== 'string') throw new Error('Email address must be a string')
      if (email.length < 10) throw new Error('Email address too short')
      if (typeof password !== 'string') throw new Error('Password must be a string')
      if (password.length < 6) throw new Error('Password too short')

      await this.appModel.registerUser({ email, password })
      res.status(200).json('Registered user')
    } catch (error) {
      res.status(400).send(error.message)
    }
  }

  login = async (req, res) => {
    const { email, password } = req.body

    try {
      if (typeof email !== 'string') throw new Error('Email address must be a string')
      if (email.length < 10) throw new Error('Email address too short')
      if (typeof password !== 'string') throw new Error('Password must be a string')
      if (password.length < 6) throw new Error('Password too short')

      const validateUser = await this.appModel.validateUser({ email, password })

      if (!validateUser) throw new Error('Password is invalid')

      const token = jwt.sign(
        { email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1h' })

      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
          sameSite: 'None',
          maxAge: 1000 * 60 * 60
        })
        .json({
          token,
          email
        })
    } catch (error) {
      res.status(400).json(error.message)
    }
  }
}
