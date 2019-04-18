const handleUsers = (req, res, db) => {
    db.select('*').from('users')
        .then(users => {
            res.json(users)
        })
        .catch(err => res.status(400).json('error getting users'))
}

module.exports = { handleUsers }