const Language = require('../models/languages');

exports.saveLanguage = async (ctx, next) => {   
    try {
        const languageName = ctx.params.name;
        // const curLanguages = Language.find();
        // const alreadyExist = curLanguages.filter(language => language.name === languageName).length > 0;
        let alreadyExist = false;
        Language.findOne({ name: languageName }, (err, doc) => {
            if (doc) {
                alreadyExist = true;
            }
        });
        console.log(alreadyExist);
        if (!alreadyExist) {
            const newLan = { name: languageName };
            const languages = new Language(newLan);
            await languages.save();
            ctx.response.body = {
                code: 0,
                msg: '添加成功',
            };
        } else {
            ctx.response.body = {
                code: 0,
                msg: '该语言已经存在',
            }
        }
    } catch (err) {
        console.log(err);
    }
}

exports.saveLanguagePost = async (ctx, next) => {
    try {
        const curLanguages = await Language.find();
        const languageName = ctx.request.body.name;
        // const alreadyExist = curLanguages.filter(language => language.name === languageName).length > 0;
        let alreadyExist = false;
        await Language.findOne({ name: languageName }, (err, doc) => {
            if (doc) {
                alreadyExist = true;
            }
        });
        if (!alreadyExist) {
            const newLan = ctx.request.body;
            const languages = new Language(newLan);
            await languages.save();
            ctx.response.body = {
                code: 0,
                msg: '添加成功'
            }
        } else {
            ctx.response.body = {
                code: 0,
                msg: '该语言已存在',
            }
        }
    } catch(err) {
        console.log(err);
    } 
}

exports.updateLanguage = async (ctx, next) => {
    try {
        const { id, description } = ctx.request.body;
        const language = await Language.findOneAndUpdate({ _id: id }, { desc: description });
        ctx.response.body = {
            code: 0,
            msg: '更新成功',
            data: language,
        }
    } catch (err) {
        console.log(err);
    }
}

exports.getLanguages = async (ctx, next) => {
    try {
        let languages = await Language.find();
        await ctx.render('languages', {
            title: 'This is language list',
            languages,
        });
    } catch (err) {
        console.log(err);
    }
}

exports.getLanguageList = async (ctx, next) => {
    try {
        const { pageSize, page } = ctx.query;
        const skip = pageSize * (Number(page) - 1);
        const languages = await Language.find().limit(Number(pageSize)).skip(skip);
        
        const newLanguages = languages.map(language => {
            const { name, _id, desc } = language;
            return {
                name,
                id: _id,
                desc,
            }
        }) 
        ctx.response.body = {
            code: 0,
            data: newLanguages,
            msg: '获取成功',
        }
    } catch (err) {
        console.log(err);
    }
}

exports.deleteLanguage = async (ctx, next) => {
    try {
        const { id } = ctx.request.body;
        const language = { _id: id };
        await Language.deleteOne(language);
        ctx.response.body = {
            code: 0,
            msg: '删除成功',
        };
    } catch (err) {
        console.log(err);
    }
}