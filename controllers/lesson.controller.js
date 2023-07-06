const User = require('../models/user.model');

const activate_lesson = async (req, res) => {
    try {
        const user_id = req.body?.user_id;
        const lesson_id = req.body?.lesson_id;

        const user = await User.findById(user_id);
        if (!user) throw new ResourceNotFound('User does not exist');

        if (user.lessons?.filter(item => item?.id === lesson_id)?.length > 0) {
            const tempLesson = user.lessons?.filter(
                item => item?.id === lesson_id,
            )?.[0];
            res.status(200).json(tempLesson);
        } else {
            if (user.payment > 0) {
                const addLesson = await User.findByIdAndUpdate(user_id, {
                    $set: {
                        lessons: [
                            ...user.lessons,
                            {
                                id: lesson_id,
                                score: null,
                            },
                        ],
                        payment: user.payment - 1,
                    },
                });

                const user_data = await User.findById(user_id);
                if (!user_data) throw new ResourceNotFound('An Error Occured!');

                const newLesson = user_data.lessons?.filter(
                    item => item?.id === lesson_id,
                )?.[0];
                res.status(200).json(newLesson);
            } else {
                res.status(500).json(
                    'Lesson Payment Exhausted, Please Re-subscribe!',
                );
            }
        }
    } catch (err) {
        res.status(500).json(err?.message || 'An Error Occured!');
    }
};

const set_homework_score = async (req, res) => {
    try {
        const user_id = req.user?.id;
        const lesson_id = req.body?.lesson_id;
        const lesson_score = req.body?.lesson_score;

        const user = await User.findById(user_id);
        if (!user) throw new ResourceNotFound('User does not exist');

        const updateScoreById = ({ data, id, score }) => {
            return data.map(obj => {
                if (obj.id === id) {
                    return {
                        ...obj,
                        score: score,
                    };
                }
                return obj;
            });
        };

        user.lessons = updateScoreById({
            data: [...user?.lessons],
            id: lesson_id,
            score: lesson_score,
        });
        await user.save();

        res.status(200).json('Successful');
    } catch (err) {
        res.status(500).json(err?.message || 'An Error Occured!');
    }
};

const set_exam_score = async (req, res) => {
    try {
        const user_id = req.user?.id;
        const exam_lvl = req.body?.exam_lvl;
        const exam_score = req.body?.exam_score;

        const user = await User.findById(user_id);
        if (!user) throw new ResourceNotFound('User does not exist');

        const updateScoreById = ({ data, level, score }) => {
            return data.map(obj => {
                if (obj.level === level) {
                    return {
                        ...obj,
                        score: score,
                    };
                }
                return obj;
            });
        };

        user.exams = updateScoreById({
            data: [...user?.exams],
            level: exam_lvl,
            score: exam_score,
        });

        if (exam_score >= 70) {
            switch (user.level) {
                case 'Beginner':
                    user.level = 'Pre-Intermediate';
                    await user.save();
                    res.status(200).json({
                        level_up: true,
                        level: 'Pre-Intermediate',
                    });
                    break;
                case 'Pre-Intermediate':
                    user.level = 'Intermediate';
                    await user.save();
                    res.status(200).json({
                        level_up: true,
                        level: 'Intermediate',
                    });
                    break;
                case 'Intermediate':
                    user.level = 'Upper-Intermediate';
                    await user.save();
                    res.status(200).json({
                        level_up: true,
                        level: 'Upper-Intermediate',
                    });
                    break;
                case 'Upper-Intermediate':
                    user.level = 'Confident';
                    await user.save();
                    res.status(200).json({
                        level_up: true,
                        level: 'Confident',
                    });
                    break;
                case 'Confident':
                    user.level = 'Confident';
                    await user.save();
                    res.status(200).json({
                        level_up: false,
                        level: 'Confident',
                    });
                    break;
                default:
                    user.level = 'Beginner';
                    await user.save();
                    res.status(200).json({
                        level_up: false,
                        level: 'Beginner',
                    });
                    break;
            }
        } else {
            res.status(200).json({
                level_up: false,
                level: exam_lvl,
            });
        }
    } catch (err) {
        res.status(500).json(err?.message || 'An Error Occured!');
    }
};

module.exports = {
    activate_lesson,
    set_homework_score,
    set_exam_score,
};
