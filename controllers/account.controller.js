

const bcrypt = require('bcrypt');
const accountService = require('../services/account.service');
const roleService = require('../services/role.service');
const saltRounds = 10;
const jwt = require('../components/jsonwebtoken');
const db = require('../models');

module.exports = {
    addAccount : async (req, res, next) => {
        const newAccount = req.body;
        try {
            const createAccount = await accountService.addAccount(newAccount);
           res.send();
        } catch (error) {
            next(error);
        }
    },
    getAllAccounts: async (req, res, next) => {
        try {
            const accounts = await accountService.getAccounts();
            return accounts;
        } catch (error) {
            next(error);
        }
    },
    getLoginPage: (req, res) => {
        //console.log(req.cookies.previousPage);
        res.render('login');
    },
    verifyAccount: (req, res, next) => {
        //get jwt
        const jwt = req.cookies.token;
        if (!jwt) {
            res.redirect('/login');
            return;
        }
        
        //verify token


        next();

    },
    login: async (req, res, next) => {
        const {username, password} = req.body;
        //check if username exist
        const account = await accountService.getAccountByUsername(username);
        console.log('account: ', JSON.stringify(req.body));
        if (!account) {
            //response error
            res.render()
            return;
        }
        bcrypt.compare(password, account.password, (err, isMatch) => {
            if (err || !isMatch) {
                console.log(err);
                //response error
                res.render('login');
                return;
            }
            console.log(JSON.stringify(account));
            //generate token and set header
            const {token, refreshToken} = jwt.generateJWT(account.username, account.roleCode, account.account_team.id);
            
            res.cookie('token', token);
            res.cookie('refreshToken', refreshToken);
            let page = req.cookies.previousPage === '/accounts/login' ? '/' : req.cookies.previousPage;
            page = page ? page : '/';
            //console.log('prevopis: ', req.session.previousPage);
            return res.redirect(page);
        })
        
    },
    createAccount: async (req, res, next) => {
        console.log(JSON.stringify(req.body));
        const {username, password, roleCode} = req.body;
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) {
                    next(err);
                } else {
                    const account = await accountService.createAccount(username, hash, roleCode);
                    if (account)
                        return res.status(201).json({});
                    else {
                        const error = new Error('Can\'t create new account');
                        next(error);
                    } 
                        
                }
            });
        });
    },
    getAccountPage: async (req, res, next) => {
        const temp = await db.matches_athletes.findAll();
        const accountList = await accountService.getAccounts();
        const roleList = await roleService.getRoles();
        res.render('account/', {accountList, roleList});

        //xu ly accountList
    }
}

