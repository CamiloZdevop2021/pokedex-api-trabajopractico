const { validationResult } = require('express-validator');

exports.register = async (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }

    const { username, password } = req.body;
    try{ 
        const hashedPassword = await bcrypt.hash(password, 10);
        const newTrainer = new Trainer ({ username, password: hashedPassword});
        await newTrainer.save();
        res.status(201).json({ message: 'Registro de entrenador completado'});
    } catch (error) {
        res.result(500).json({ message: 'Error al registrar entrenador', });

    }
};



exports.login = async (req, res)  => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       return res.status(400).json ({errors: errors.array()}); 
    }
   const { username, password } = req.body;
   try{
    const trainer = await Trainer.findOne({ username });
    if (!trainer || !(await bcrypt.compare(password, trainer.password))) {
        return res.status(401).json ({message: 'Credenciales invalidas'});
    }
    const token = jwt.sign ({id: trainer._id, role: trainer.role}, process.env.JWT_SECRET, { expiresIn: '1h'});
    res.json({ token });
} catch (error) { 
    res.status(500).json({ message: 'Error de logueo', error}); 
    }
};


 